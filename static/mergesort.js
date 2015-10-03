function merge(A) {
  if (A.length <= 1) {
    return A;
  } else {
    var m = A.length/2;
    var left = merge(A.slice(0,m));
    var right = merge(A.slice(m, A.length));

    var i = 0;
    var l = 0;
    var r = 0;
    while (i < A.length) {
      if (l < left.length && r < right.length) {
        if (left[l] < right[r]) {
          A[i] = left[l];
          l += 1;
        }
        else if (left[l] > right[r]) {
          A[i] = right[r];
          r += 1;
        }
      } else {
        if (r < right.length) {
          //only increment r
          A[i] = right[r]
          r += 1;
        }
        else if (l < left.length) {
          //only increment l
          A[i] = left[l];
          l += 1;
        }
      }
      i += 1;
    }
    return A;
  }
}
