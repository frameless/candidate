// The following properties were missing from the tslib@2.8.1
interface CustomStateSet {
  /* https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet/add */
  add: (value: string) => void;
  /* https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet/delete */
  delete: (value: string) => void;
}
