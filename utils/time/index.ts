const timestampNow = () => {
  return Math.floor(Date.now() / 1000);
};

const hourDiff = (startHour: string, endHour: string) => {
  const startTimeObj = new Date(`2000-01-01T${startHour}`);
  const endTimeObj = new Date(`2000-01-01T${endHour}`);

  const timeDiff: number = endTimeObj.getTime() - startTimeObj.getTime();

  const hoursDiff: number = timeDiff / (1000 * 60 * 60);

  return hoursDiff;
};


const unixToThaiDateTime = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp);
  const thaiMonthsFull = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const thaiMonthsShort = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'ม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  const thaiMonthFull = thaiMonthsFull[monthIndex];
  const thaiMonthShort = thaiMonthsShort[monthIndex];


  return {
    full: `${day} ${thaiMonthFull} ${year + 543} ${hours}:${minutes}`,
    short: `${day} ${thaiMonthShort} ${year + 543} ${hours}:${minutes}`
  }
}

export const TIME = {
  timestampNow: timestampNow,
  hourDiff: hourDiff,
  unixToThaiDateTime: unixToThaiDateTime
}

