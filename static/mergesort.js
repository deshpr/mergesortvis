function updatevis(orig, A, start) {
  var newArr = orig.map(function(v, i) {
    if (i >= start && i < start+A.length) {
      var Aindex = i-start;
      return A[Aindex];
    }
    return orig[i];
  });
  console.log('newArry');
  console.log(newArr);

}

function merge(orig, A, start) {
  console.log('start');
  console.log(start);
  if (A.length <= 1) {
    return A;
  } else {
    var m = Math.ceil(A.length/2);
    var left = merge(orig, A.slice(0,m), start);
    var right = merge(orig, A.slice(m, A.length), start+m);

    var i = 0;
    var l = 0;
    var r = 0;
    while (i < A.length) {
      if (l < left.length && r < right.length) {
        if (left[l] <= right[r]) {
          A[i] = left[l];
          updatevis(orig, A, start);
          l += 1;
        }
        else if (left[l] > right[r]) {
          A[i] = right[r];
          updatevis(orig, A, start);

          r += 1;
        }
      } else {
        if (r < right.length) {
          //only increment r
          A[i] = right[r]
          updatevis(orig, A, start);

          r += 1;
        }
        else if (l < left.length) {
          //only increment l
          A[i] = left[l];
          updatevis(orig, A, start);

          l += 1;
        }
      }
      i += 1;
    }
    return A;
  }
}
