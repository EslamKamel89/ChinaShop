export default defineEventHandler(async (e) => {
  const body = await readBody<{}>(e);
});
