import React, { useState, useEffect } from 'react';

interface TimeInputProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const [time, setTime] = useState<string>(''); 

  useEffect(() => {
    if (value) {
      const hours = value.getHours().toString().padStart(2, '0');
      const minutes = value.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    }
  }, [value]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    const [hours, minutes] = newTime.split(':').map(Number);
    if (hours !== undefined && minutes !== undefined) {
      const newDate = new Date();
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      newDate.setSeconds(0);
      onChange(newDate);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="p-2 border-2 border-primary rounded-md w-[96%]"
      />
    </div>
  );
};

export default TimeInput;
