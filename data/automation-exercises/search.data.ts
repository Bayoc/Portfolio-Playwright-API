export const searchEdgeCasesData = [
    { term: 'NieistniejacyProdukt123', description: 'non-existing product name' },
    { term: '   ', description: 'only whitespaces' },
    { term: '!@#$%^&*()', description: 'special characters' },
    { term: 'A'.repeat(300), description: 'extremely long string (300 chars)' }
];