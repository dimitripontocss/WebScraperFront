export default function dataFormater(data) {
  const date = data.slice(0, data.indexOf("T"));
  const time = data.slice(data.indexOf("T") + 1, 16);

  const spTime =
    String(time.slice(0, time.indexOf(":")) - 3) +
    time.slice(time.indexOf(":"));
  return { date, spTime };
}
