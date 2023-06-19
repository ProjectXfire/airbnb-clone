'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { type CreateRentDto } from '@modules/places/dtos';
import { RentSchema } from '@modules/places/schemas';
import { categories } from '@/shared/utilities';
import { saveListing } from '@modules/places/services';
import { useRentModal } from '@modules/places/hooks';
import { Categories, Images, Information, Location } from '@modules/places/components';
import { Button, Divider, InputForm, Modal } from '@/shared/components';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

function RentModal(): JSX.Element {
  const router = useRouter();
  const { isOpen, onCLose } = useRentModal();
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const { values, setFieldValue, resetForm, getFieldProps, handleSubmit, validateForm } =
    useFormik<CreateRentDto>({
      initialValues: {
        category: '',
        location: undefined,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        price: 1,
        title: '',
        description: ''
      },
      validationSchema: RentSchema,
      onSubmit: async (values) => {
        setIsLoading(true);
        const { error } = await saveListing(values);
        if (error) {
          toast.error(error);
        } else {
          toast.success('Listing created!');
          router.refresh();
          onResetForm();
        }
        setIsLoading(false);
      }
    });

  const onBack = (): void => {
    setStep((cv) => cv - 1);
  };

  const onNext = (): void => {
    if (step === STEPS.PRICE) {
      onCreate();
      return;
    }
    setStep((cv) => cv + 1);
  };

  const nextActionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create';
    return 'Next';
  }, [step]);

  const backActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return null;
    return 'Back';
  }, [step]);

  const onCreate = async (): Promise<void> => {
    const hasErrors = await validateForm();
    if (Object.keys(hasErrors).length > 0) {
      toast.error('Some fields are missing, please fill all!');
    }
    handleSubmit();
  };

  const onResetForm = (): void => {
    onCLose();
    resetForm();
    setStep(STEPS.CATEGORY);
  };

  const renderSteps = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return {
        title: 'Where is your place located?',
        component: (
          <Location
            onChange={(value) => {
              setFieldValue('location', value, false);
            }}
            value={values.location}
            center={values.location?.latlng}
          />
        )
      };
    }
    if (step === STEPS.INFO) {
      return {
        title: 'Share some basics about your place',
        component: (
          <Information
            guestsValue={values.guestCount}
            roomsValue={values.roomCount}
            bathroomsValue={values.bathroomCount}
            onChange={(value, valueType) => {
              setFieldValue(valueType, value, false);
            }}
          />
        )
      };
    }
    if (step === STEPS.IMAGES) {
      return {
        title: 'Add a photo of your place',
        component: (
          <Images
            onChange={(url) => {
              setFieldValue('imageSrc', url, false);
            }}
            value={values.imageSrc}
          />
        )
      };
    }
    if (step === STEPS.DESCRIPTION) {
      return {
        title: 'How would you describe your place?',
        component: (
          <>
            <InputForm
              hasValue={!!values.title}
              name='title'
              type='text'
              placeholder='Place name'
              register={getFieldProps}
            />
            <InputForm
              hasValue={!!values.description}
              name='description'
              type='text'
              inputType='textarea'
              placeholder='Short and sweet works best!'
              register={getFieldProps}
            />
          </>
        )
      };
    }
    if (step === STEPS.PRICE) {
      return {
        title: 'How would you describe your place?',
        component: (
          <InputForm
            disabled={isLoading}
            hasValue={!!values.price}
            name='price'
            type='number'
            placeholder='Place price ($)'
            register={getFieldProps}
          />
        )
      };
    }
    return {
      title: 'Which of these best describes your place?',
      component: (
        <Categories
          categories={categories}
          categorySelected={values.category}
          onClick={(cat) => {
            setFieldValue('category', cat, false);
          }}
        />
      )
    };
  }, [step, values]);

  return (
    <Modal
      isOpen={isOpen}
      title='Airbnb your home!'
      subtitle={renderSteps.title}
      close={onResetForm}
    >
      {renderSteps.component}
      <Divider />
      {backActionLabel !== null && (
        <Button disabled={isLoading} text={backActionLabel} type='button' onClick={onBack} />
      )}
      <Button text={nextActionLabel} disabled={isLoading} type='button' onClick={onNext} />
    </Modal>
  );
}
export default RentModal;
