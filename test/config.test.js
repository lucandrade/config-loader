const expect = require('expect');
const config = require(`../index`)().path(`${process.cwd()}/config`);

describe('Helper: Config', () => {
    afterEach(() => {
        config().clear();
    });

    it('missing file with default value', function () {
        expect(config('missingfile.lang', 123)).toBe(123);
    });

    it('existing file', function () {
        expect(config('file.key')).toBe('value');
    });

    it('existing file without value', function () {
        expect(config('file.dd', 'notfound')).toBe('notfound');
    });

    it('setting value existing file', function () {
        config().set('file.key', 'new-value');
        expect(config('file.key')).toBe('new-value');
    });

    it('setting value missing file', function () {
        config().set('missingfile.sun.key', 'value');
        expect(config('missingfile.sun.key')).toBe('value');
    });

    it('should have environment variables', function () {
        expect(config('env')).toBe('test');
    });

    it('should set environment variables', function () {
        config().set('env', 'new-value');
        expect(config('env')).toBe('new-value');
    });
});