import { describe, expect, it, jest } from '@jest/globals';
import { cleanupUrlPath } from '../utils';

jest.mock('@hub/ui-lib', () => {
    return {
        ApplicationTiers: () => {
            return {
                findByValue: () => {
                    return {
                        label: 'Tier 0',
                    };
                },
            };
        },
    };
});

describe('cleanupUrlPath', () => {
    it('returns a better formatted URL pathname', () => {
        let pathname = "/test";
        expect(cleanupUrlPath(pathname)).toBe('/test');

        pathname = '//';
        expect(cleanupUrlPath(pathname)).toBe('/');

        pathname = '//test';
        expect(cleanupUrlPath(pathname)).toBe('/test');

        pathname = '//test//';
        expect(cleanupUrlPath(pathname)).toBe('/test/');

        pathname = '//test//test';
        expect(cleanupUrlPath(pathname)).toBe('/test/test');

        pathname = '///test///test/';
        expect(cleanupUrlPath(pathname)).toBe('/test/test/');
    });
})