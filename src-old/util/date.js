/**
 * Outputs the date in dd/mm/yyyy format
 * 
 * @export
 * @param {Date} date 
 */
export function format(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
