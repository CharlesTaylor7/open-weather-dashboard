import hello from '@/hello';

test('hello world', () => {
  expect(hello()).toEqual('Hello, World!');
});
