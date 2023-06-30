'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import { type Range } from 'react-date-range';
import { type CountryModel } from '../models';
import { useSearchModal } from '../hooks';
import { Button, Divider, Heading, Modal } from '@shared/components';
import CountrySelect from './CountrySelect';
import LoadingMap from './LoadingMap';
import Calendar from './Calendar';
import Counter from './Counter';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const INIT_FILTERS = {
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  dateRange: { startDate: new Date(), endDate: new Date(), key: 'selection' }
};

interface IFilters {
  bathroomCount: number;
  guestCount: number;
  roomCount: number;
  dateRange: Range;
}

function SearchModal(): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();
  const { isOpen, onCLose } = useSearchModal();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountryModel>();
  const [filters, setFilters] = useState<IFilters>(INIT_FILTERS);
  const { bathroomCount, guestCount, roomCount, dateRange } = filters;

  const Map = useMemo(
    () =>
      dynamic(async () => await import('./Map'), {
        ssr: false,
        loading: () => (
          <div
            style={{
              height: '35vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LoadingMap />
          </div>
        )
      }),
    [location]
  );

  const onBack = (): void => {
    setStep((cv) => cv - 1);
  };

  const onNext = (): void => {
    if (step === STEPS.INFO) {
      onSumit();
      return;
    }
    setStep((cv) => cv + 1);
  };

  const nextActionLabel = useMemo(() => {
    if (step === STEPS.INFO) return 'Save';
    return 'Next';
  }, [step]);

  const backActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return null;
    return 'Back';
  }, [step]);

  const onSumit = async (): Promise<void> => {
    let query = {};
    if (params) {
      query = qs.parse(params.toString());
    }
    const updateQuery: any = {
      ...query,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };
    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate);
    }
    const url = qs.stringifyUrl({ url: '/', query: updateQuery }, { skipNull: true });
    router.push(url);
    onResetFilters();
  };

  const onResetFilters = (): void => {
    onCLose();
    setStep(STEPS.LOCATION);
    setFilters(INIT_FILTERS);
    setLocation(undefined);
  };

  const renderSteps = useMemo(() => {
    if (step === STEPS.DATE)
      return (
        <>
          <Heading title='When do you plan to go?' subtitle='Make sure everyone is free!' />
          <Calendar
            value={dateRange}
            onChange={(value) => {
              setFilters({ ...filters, dateRange: value.selection });
            }}
          />
        </>
      );
    if (step === STEPS.INFO)
      return (
        <>
          <Heading title='More information' subtitle='Plan your guests' />
          <Divider />
          <Counter
            title='Guest'
            subtitle='How many guest are coming?'
            value={guestCount}
            onChange={(value) => {
              setFilters({ ...filters, guestCount: value });
            }}
          />
          <Counter
            title='Rooms'
            subtitle='How many rooms do you need?'
            value={roomCount}
            valueType='roomCount'
            onChange={(value) => {
              setFilters({ ...filters, roomCount: value });
            }}
          />
          <Counter
            title='Bathrooms'
            subtitle='How many bathrooms do you need?'
            value={bathroomCount}
            valueType='bathroomCount'
            onChange={(value) => {
              setFilters({ ...filters, bathroomCount: value });
            }}
          />
        </>
      );
    return (
      <>
        <Heading title='Where do you wanna go?' subtitle='Find the perfect location' />
        <CountrySelect
          value={location}
          onChange={(value) => {
            setLocation(value);
          }}
        />
        <Divider />
        <Map center={location?.latlng} />
      </>
    );
  }, [filters, step, location]);

  return (
    <Modal
      isOpen={isOpen}
      title='Plan your next travel'
      close={() => {
        onCLose();
        onResetFilters();
      }}
    >
      {renderSteps}
      <Divider />
      {backActionLabel !== null && <Button text={backActionLabel} type='button' onClick={onBack} />}
      <Button text={nextActionLabel} type='button' onClick={onNext} />
    </Modal>
  );
}
export default SearchModal;
