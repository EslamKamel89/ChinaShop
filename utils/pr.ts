export default function pr<T>(value: T, title = ""): T {
  console.log(` =-=-=-=-=-=-=-${title}=-=-=-=-=-=-=- `);
  console.log(value);
  return value;
}
