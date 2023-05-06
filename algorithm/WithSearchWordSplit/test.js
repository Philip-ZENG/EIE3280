const mya = [true,false,false,true]
for (let i = 0; i < mya.length; i++) {
  // check if this page has already been visited
  if (mya[i]) {
    continue;
  }
  console.log(mya[i]);
}