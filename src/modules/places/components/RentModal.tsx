'use client';

import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { type RentModel } from '@modules/places/models';
import { categories } from '@/shared/utilities';
import { useRentModal } from '@modules/places/hooks';
import { Categories, Information, Location } from '@modules/places/components';
import { Button, Divider, Modal } from '@/shared/components';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

function RentModal(): JSX.Element {
  const { isOpen, onCLose } = useRentModal();
  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const { values, setFieldValue, resetForm } = useFormik<RentModel>({
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
    onSubmit: (values) => {}
  });

  const onBack = (): void => {
    setStep((cv) => cv - 1);
  };

  const onNext = (): void => {
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
      close={() => {
        onCLose();
        resetForm();
        setStep(STEPS.CATEGORY);
      }}
    >
      {renderSteps.component}
      <Divider />
      {backActionLabel !== null && <Button text={backActionLabel} type='button' onClick={onBack} />}
      <Button text={nextActionLabel} type='button' onClick={onNext} />
    </Modal>
  );
}
export default RentModal;
