import * as Yup from 'yup';

export const RentSchema = Yup.object({
  category: Yup.string().required('Category is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  imageSrc: Yup.string().required('Image is required'),
  location: Yup.object()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
      flag: Yup.string().required(),
      region: Yup.string().required(),
      latlng: Yup.array().required()
    })
    .required('Location is required'),
  guestCount: Yup.number().min(1, 'Min value is 1').required('Guest count is required'),
  roomCount: Yup.number().min(1, 'Min value is 1').required('Room count is required'),
  bathroomCount: Yup.number().min(1, 'Min value is 1').required('Bathroom count is required'),
  price: Yup.number().min(1, 'Min value is 1').required('Price is required')
});
