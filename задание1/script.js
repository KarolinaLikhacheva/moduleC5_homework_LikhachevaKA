const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const parser = new DOMParser();
const xml = parser.parseFromString(xmlString, "application/xml");
const students = xml.querySelectorAll("student");
const result = { list: [] };

students.forEach((student) => {
  const nameNode = student.querySelector("name");
  const firstNode = nameNode.querySelector("first");
  const secondNode = nameNode.querySelector("second");
  const ageNode = student.querySelector("age");
  const profNode = student.querySelector("prof");
  const langAttr = nameNode.getAttribute("lang");

  const name = `${firstNode.textContent} ${secondNode.textContent}`;
  result.list.push({
    name,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr
  });
});

console.log(result);
