function updatevis(orig, A, start) {
  var newArr = orig.map(function(v, i) {
    if (i >= start && i < start+A.length) {
      var Aindex = i-start;
      return A[Aindex];
    }
    return orig[i];
  });
}

function right(a) {
  return a;
}

function left(a) {
  return a;
}


function merge(orig, A, start, i, l, r, right, left, callback) {
    console.log(arguments);
    if (i < A.length) {
      if (l < left.length && r < right.length) {
        if (left[l] <= right[r]) {
          A[i] = left[l];
          updatevis(orig, A, start);
          setTimeout(merge.bind(null, orig, A, start, i+1, l+1, r, right, left, callback), 1000);

        }
        else if (left[l] > right[r]) {
          A[i] = right[r];
          updatevis(orig, A, start);
          setTimeout(merge.bind(null, orig, A, start, i+1, l, r+1, right, left, callback), 1000);
        }
      } else {
        if (r < right.length) {
          //only increment r
          A[i] = right[r]
          updatevis(orig, A, start);
          setTimeout(merge.bind(null, orig, A, start, i+1, l, r+1, right, left, callback), 1000);
        }
        else if (l < left.length) {
          //only increment l
          A[i] = left[l];
          updatevis(orig, A, start);
          setTimeout(merge.bind(null, orig, A, start, i+1, l+1, r, right, left, callback), 1000);
        }
     }
   } else {
     callback(A);
   }
}

function split(orig, A, start, callback) {
  if (A.length <= 1) {
    callback(A);
  } else {
    var i = 0;
    var l = 0;
    var r = 0;

    var m = Math.ceil(A.length/2);
    split(orig, A.slice(0,m), start, function(L) {
      split(orig, A.slice(m, A.length), start+m, function(R) {
        merge(orig, A, start, i, l, r, right(R), left(L), callback);
      });
    });

  }
}
