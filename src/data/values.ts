export const values = {
  title: 'CVSS 3.1 Types and Values',
  types: [
    {
      title: 'Attack Vector',
      values: ['Network', 'Adjacent', 'Local', 'Physical'],
      strings: ['N', 'A', 'L', 'P'],
    },
    {
      title: 'Attack Complexity',
      values: ['Low', 'High'],
      strings: ['L', 'H'],
    },
    {
      title: 'Privileges Required',
      values: ['None', 'Low', 'High'],
      strings: ['N', 'L', 'H'],
    },
    {
      title: 'User Interaction',
      values: ['None', 'Required'],
      strings: ['N', 'R'],
    },
    {
      title: 'Scope Vector',
      values: ['Unchanged', 'Changed'],
      strings: ['U', 'C'],
    },
    {
      title: 'Confidentiality Impact',
      values: ['None', 'Low', 'High'],
      strings: ['N', 'L', 'H'],
    },
    {
      title: 'Integrity Impact',
      values: ['None', 'Low', 'High'],
      strings: ['N', 'L', 'H'],
    },
    {
      title: 'Availability Impact',
      values: ['None', 'Low', 'High'],
      strings: ['N', 'L', 'H'],
    },
  ],
};
