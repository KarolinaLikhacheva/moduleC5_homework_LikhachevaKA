const jsonString = `{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }`;
   
   const obj = JSON.parse(jsonString);
   for (let i = 0; i < obj.list.length; i++) {
     obj.list[i].age = parseInt(obj.list[i].age);
   }
   
   console.log(obj);   