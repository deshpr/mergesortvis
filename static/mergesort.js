function updatevis(depth, svg, orig, A, start) {
  svg.drawsvg( depth, orig.map(function(v, i) {
    if (i >= start && i < start+A.length) {
      var Aindex = i-start;
      return A[Aindex];
    }
    return orig[i];
  }));
}

function merge(depth, svg, orig, A, start, i, l, r, right, left, callback) {
    if (i < A.length) {
      if (l < left.length && r < right.length) {
        if (left[l] <= right[r]) {
          A[i] = left[l];
          updatevis(depth, svg, orig, A, start);
          setTimeout(merge.bind(null, depth, svg, orig, A, start, i+1, l+1, r, right, left, callback), 10);

        }
        else if (left[l] > right[r]) {
          A[i] = right[r];
          updatevis(depth, svg, orig, A, start);
          setTimeout(merge.bind(null, depth, svg, orig, A, start, i+1, l, r+1, right, left, callback), 10);
        }
      } else {
        if (r < right.length) {
          A[i] = right[r]
          updatevis(depth, svg, orig, A, start);
          setTimeout(merge.bind(null, depth, svg, orig, A, start, i+1, l, r+1, right, left, callback), 10);
        }
        else if (l < left.length) {
          A[i] = left[l];
          updatevis(depth, svg, orig, A, start);
          setTimeout(merge.bind(null, depth, svg, orig, A, start, i+1, l+1, r, right, left, callback), 10);
        }
     }
   } else {
     callback(A);
   }
}

function split(depth, svg, orig, A, start, callback) {
  console.log(depth);
  if (A.length <= 1) {
    callback(A);
  } else {
    var i = 0;
    var l = 0;
    var r = 0;

    var m = Math.ceil(A.length/2);
    split(depth+1,svg, orig, A.slice(0,m), start, function(L) {
      split(depth+1,svg, orig, A.slice(m, A.length), start+m, function(R) {
        console.log(depth);
        merge(depth, svg, orig, A, start, i, l, r, R, L, callback);
      });
    });
  }
}
