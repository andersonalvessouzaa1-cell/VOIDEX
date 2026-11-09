import assert from 'node:assert/strict';
import { copyText } from '../lib/browser-actions';

export async function runBrowserActionsTests() {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const setNavigator = (value: unknown) => Object.defineProperty(globalThis, 'navigator', { configurable: true, value });
  try {
    let copied = '';
    setNavigator({ clipboard: { writeText: async (text: string) => { copied = text; } } });
    assert.equal(await copyText('/w Tenno Olá!'), true);
    assert.equal(copied, '/w Tenno Olá!');
    setNavigator({ clipboard: { writeText: async () => { throw new Error('Permissão recusada'); } } });
    assert.equal(await copyText('mensagem'), false);
    setNavigator({});
    assert.equal(await copyText('mensagem'), false);
    setNavigator(undefined);
    assert.equal(await copyText('mensagem'), false);
    console.log('browser-actions: cópia, recusa e API ausente conferidas');
    return { passed: 4, failed: 0 };
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'navigator', descriptor);
    else Reflect.deleteProperty(globalThis, 'navigator');
  }
}
