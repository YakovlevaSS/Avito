export const FormatPhoneNumberClose = ({ phoneNumber, isShow }) => {
  // Удаление нецифровых символов
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  // Если в исходном номере есть "+", сохраняем его перед первой цифрой
  const firstChar = phoneNumber.includes("+") ? "+" : "";

  // Получение первой цифры, следующих трех цифр и оставшихся цифр
  const firstDigit = cleanedNumber.charAt(0);
  const nextThreeDigits = cleanedNumber.substr(1, 3);
  const remainingDigits = cleanedNumber.substr(4);

  // Замена всех цифр начиная с четвертой на "х", если isShow равно false
  const replacedRemainingDigits = isShow
    ? remainingDigits
    : remainingDigits
    ? remainingDigits.replace(/\d/g, "X")
    : "";

  // Форматирование номера
  const formattedNumber = `${firstChar}${firstDigit} ${nextThreeDigits} ${replacedRemainingDigits}`;

  return <span>{formattedNumber}</span>;
};
