import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';
const loadPackage = createRequire(import.meta.url);
const { NextRequest } = loadPackage('next/server');
function load(file, extras = {}) {
  const context = { exports: {}, require: loadPackage, TextEncoder, AbortSignal, ...extras };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, context);
  return context.exports;
}
const shared = load('src/lib/contact.ts');
const valid = { ...shared.emptyContact, name: '  María López  ', email: 'hola@example.com', services: ['Branding', 'Branding'], idea: 'Quiero crear una nueva marca y una web para mi negocio.', consent: true };
assert.equal(Object.keys(shared.validateContact(valid).errors).length, 0);
assert.equal(shared.validateContact(valid).values.name, 'María López');
assert.equal(shared.validateContact(valid).values.services.length, 1);
assert.equal(shared.validateContact({...valid, phone:'+52 (664) 123-4567'}).errors.phone, undefined);
assert.ok(shared.validateContact({...valid, phone:'++1234567'}).errors.phone);
assert.ok(shared.validateContact({...valid, email:'hola'}).errors.email);
assert.ok(shared.validateContact({...valid, services:['desconocido']}).errors.services);
assert.ok(shared.validateContact({...valid, idea:'corto'}).errors.idea);
assert.ok(shared.validateContact({...valid, idea:'x'.repeat(2001)}).errors.idea);
assert.ok(shared.validateContact({...valid, consent:'true'}).errors.consent);
assert.ok(shared.validateContact({...valid, website:'bot'}).errors.website);
assert.ok(shared.validateContact(null).errors.name);
assert.equal(shared.validateContact({...valid, budget:undefined, timeline:undefined}).errors.budget, undefined);
let calls = 0;
let captured;
function route(env = {RESEND_API_KEY:'test-only', CONTACT_FROM_EMAIL:'Agency <agency@example.com>'}, upstream = () => new Response(JSON.stringify({id:'mock-message'}), {status:200})) {
  return load('src/app/api/contact/route.ts', {
    process:{env},
    require: name => name === '@/lib/contact' ? shared : name === '@/data/site' ? {contactEmail:'contacto@puntovisual.mx'} : loadPackage(name),
    fetch: async (_url, options) => { calls++; captured = JSON.parse(options.body); return upstream(); },
  });
}
function request(body = valid, headers = {}) {
  return new NextRequest('http://localhost:3000/api/contact', {method:'POST', headers:{'content-type':'application/json', origin:'http://localhost:3000', ...headers}, body: typeof body === 'string' ? body : JSON.stringify(body)});
}
(async () => {
  let response = await route().POST(request());
  assert.equal(response.status,200);
  assert.equal(captured.reply_to,'hola@example.com');
  assert.equal(captured.to[0],'contacto@puntovisual.mx');
  assert.ok(captured.text.includes('María López'));
  assert.equal((await route().POST(request({...valid,email:'invalid'}))).status,400);
  assert.equal((await route().POST(request({...valid,website:'bot'}))).status,400);
  assert.equal((await route({}).POST(request())).status,503);
  assert.equal((await route().POST(request('{'))).status,400);
  assert.equal((await route().POST(request(valid, {origin:'https://other.example'}))).status,403);
  assert.equal((await route().POST(request(valid, {'content-type':'text/plain'}))).status,415);
  assert.equal((await route().POST(request({idea:'x'.repeat(17000)}))).status,413);
  assert.equal((await route(undefined, () => new Response('{}',{status:500})).POST(request())).status,502);
  assert.equal((await route(undefined, () => new Response('{}',{status:200})).POST(request())).status,502);
  assert.equal((await route(undefined, () => {throw new Error('mock network failure');}).POST(request())).status,502);
  const limited = route();
  for (let i=0;i<5;i++) assert.equal((await limited.POST(request())).status,200);
  assert.equal((await limited.POST(request())).status,429);
  assert.equal(calls, 9);
  console.log('OK: validación, normalización, envío simulado, errores del proveedor, spam, límite y configuración ausente. Ningún correo real fue enviado.');
})().catch(error => {console.error(error);process.exitCode=1;});
