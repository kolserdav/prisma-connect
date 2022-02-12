// @ts-check

const { PrismaClient, Test } = require('@prisma/client');
const prisma = new PrismaClient();

// Количество обрабатываемых полей за один запрос 
const TAKE = 5000;

/**
 * Создание фейковых полей для теста
 * @param {number} count количество создаваемых элементов
 */
const createFakeFields = async (count) => {
  const arr = [...Array(count).keys()];
  const res = await prisma.test.createMany({
    data: arr.map((item) => {
      return {
        target: `item-${item}.webp`  
      }
    })
  });
  console.info('Create fake fields result:', res);
}

/**
 * Получает партию элементов
 * @param {number} part порядковый номер партии 
 * @returns {Promise<Test[]>}
 */
const findMany = async (part) => {
  const skip = TAKE * part - TAKE;
  return prisma.test.findMany({
    skip,
    take: TAKE
  });
}

/**
 * 
 * @param {Test[]} list 
 */
const updateMany = async (list) => {
  await prisma.$transaction(
    list.map((item) =>
      prisma.test.upsert({
        where: { id: item.id },
        update: { target: item.target.replace(/\.webp/, '.jpg') },
        create: item,
      })
    )
  );
  console.log(new Date(), `Updated part of ${list.length} items. Last id is ${list[list.length - 1].id}...`)
}

/**
 * Точка запуска скрипта
 */
(async () => {
  console.info(new Date(), 'Started change string to regex script...')
  let length = 0;
  let i = 1;
  while(i) {
    const res = await findMany(i);
    if (res.length === 0) {
      console.info(new Date(), `Updated ${length} records successfully!`);
      break;
    }
    length = (i - 1) * TAKE + res.length;
    await updateMany(res);
    i ++;
  }
  process.exit(0);
})();