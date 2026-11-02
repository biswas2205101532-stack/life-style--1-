const t = (id, text) => ({ id, text, done: false })
export const seed = [
  {
    id: 'c',
    name: 'C',
    weeks: [
      { title: 'Week 1: Basics', tasks: [t('c11', 'Install GCC and write Hello World'), t('c12', 'Variables, data types, operators'), t('c13', 'Input/output with printf and scanf')] },
      { title: 'Week 2: Control flow & functions', tasks: [t('c21', 'if/else and switch'), t('c22', 'Loops: for, while, do-while'), t('c23', 'Functions and recursion')] },
      { title: 'Week 3: Arrays, strings & pointers', tasks: [t('c31', 'Arrays and strings'), t('c32', 'Pointers and pointer arithmetic'), t('c33', 'Dynamic memory: malloc/free')] },
      { title: 'Week 4: Structs, files & project', tasks: [t('c41', 'Structs and enums'), t('c42', 'File handling'), t('c43', 'Build a small project')] },
    ],
  },
]
