function orderByVoteScore(a, b) {
  return b.voteScore - a.voteScore;
}

function orderByTimestamp(a, b) {
  return b.timestamp - a.timestamp
}

export function sortBy(arr, by) {
  switch (by) {
    case 'voteScore':
      arr.sort(orderByVoteScore);
      break;
    case 'timestamp':
      arr.sort(orderByTimestamp);
      break;
    default:
      break;
  }
  return arr;
}