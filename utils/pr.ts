export default function pr<T>(value: T, title = ""): T {
  console.log("\n\n\n");
  console.log(` START =-=-=-=-=-=-=-${title}=-=-=-=-=-=-=- `);
  console.log(value);
  // console.log("/\\/\\/\\ - table");
  // console.table(value);
  // console.log("/\\/\\/\\ - JsonEncode");
  // console.log(JSON.stringify(value, null, 2));
  // console.log(` END =-=-=-=-=-=-=-=-=-=-=-=-=-=- `);
  // console.log("\n\n\n");
  return value;
}
