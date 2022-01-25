import moment from "moment";
export const timeStampToDateTime = (timeStamp) => {
  return {
    format: (value) => {
      return moment(new Date(timeStamp * 1000)).format(value);
    },
  };
};

export const getCountryName = (countryCode) => {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countryCode);
};
