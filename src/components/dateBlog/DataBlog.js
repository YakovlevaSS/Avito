import { format } from 'date-fns';

export const DateBlock = ({ time }) => {
    const createMonth = (numberOfMonth) => {
      switch (numberOfMonth) {
        case 0: {
          return "января";
        }
        case 1: {
          return "февраля";
        }
        case 2: {
          return "марта";
        }
        case 3: {
          return "апреля";
        }
        case 4: {
          return "мая";
        }
        case 5: {
          return "июня";
        }
        case 6: {
          return "июля";
        }
        case 7: {
          return "августа";
        }
        case 8: {
          return "сентября";
        }
        case 9: {
          return "октября";
        }
        case 10: {
          return "ноября";
        }
        case 11: {
          return "декабря";
        }
        default:
          return "";
      }
    };
  
    const date = new Date(time);
    const day = date.getDate();
    const month = createMonth(date.getMonth());
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return <span>{`${day} ${month} в ${hours}:${minutes}`}</span>;
  };

  export const FormatSellingSince = ({dateString}) => {
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
  
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const formattedDate = `Продает товары с ${months[monthIndex]} ${year}`;
    return <span>{formattedDate}</span>;
  }


export const DateReview = ({inputDate}) => {
  
  // Преобразование строки в объект Date
  const dateObject = new Date(inputDate);

  // Определение месяца на русском языке
  const monthNames = [
    'января', 'февраля', 'марта',
    'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'
  ];

  // Форматирование даты в новый формат
  return <span>{format(dateObject, 'd')} {monthNames[dateObject.getMonth()]}</span>;

};

 