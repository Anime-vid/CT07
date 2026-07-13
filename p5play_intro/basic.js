function setup() {
  var area = 0.5*10*5
  new Canvas(800, 800);
  background(250);
  console.log("Hello");
  console.log(area);
  // text(area,100,100);
  
  // --- Exercise: Area of Triangle ---
  // write your codes here

  // --- Exercise: Sum of first 10 even numbers ---
  let totalsum = 0
  for(i = 2; i <= 20; i += 2);
    {console.log(i);
      totalsum += i
    }
  console.log(totalsum)
  text(totalsum,100,100)

  // --- Exercise: Age category classification ---
  let age = 9
  if (age <= 9){
    console.log("Lower primary");
  }else if (age <= 12){console.log("Upper primary");}else{console.log("Secondary");}

  // --- Exercise: Display odd numbers backward using while loop ---
  for(i = 19; i >= 11; i -= 2)
    {console.log(i);
    }

  // --- Exercise: Array operations (groceries) ---
  // write your codes here
}

