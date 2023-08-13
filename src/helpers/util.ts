const negative1ToNull = (idx: number): number | null => {
  if (idx === -1) {
    return null;
  } else {
    return idx;
  }
};

export { negative1ToNull };
