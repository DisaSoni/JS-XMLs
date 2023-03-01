//part 1 module

var student = (() => {
  
var  numItems = 0;
var  names = [];

  // private methods
  function GetNumbers  (Newstudent) {
    names.push(Newstudent);
    
  }
  function addNumItems  () {
      return names.length;
  }

  // public methods
  return {
    GetNumbers: function (Newstudent)  {
      GetNumbers(Newstudent);
          numItems++;
      },
      addNumItems: function () {
          return addNumItems();
      },
      names
  };
})();

// Usage example:

student.GetNumbers('Disa');
console.log(student.addNumItems());
console.log(student.names);


student.GetNumbers('krunal');
console.log(student.addNumItems());
console.log(student.names);


student.GetNumbers('Krishna');
console.log(student.addNumItems());
console.log(student.names);


student.GetNumbers('kena');
console.log(student.addNumItems());
console.log(student.names);


//part 2 blocking vs non blocking

console.log("Scriptt");

// Non-blocking code example using setTimeout which isinside settimeout
setTimeout(() => {
    console.log("This is Disa");
}, 3000);

// blocking 
console.log("Set time out");