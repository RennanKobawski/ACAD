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

    if (!isNaN(hours) && !isNaN(minutes)) {
      const newDate = new Date();
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      newDate.setSeconds(0);
      onChange(newDate);
    }
  };

  const handleBlur = () => {
    const [hours, minutes] = time.split(':').map(str => str.padStart(2, '0'));
    setTime(`${hours}:${minutes}`);
  };

  return (
    <div className="flex flex-col">
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        onBlur={handleBlur}
        className="p-2 border-2 border-primary rounded-md w-[96%] h-7 text-sm text-[#515151] bg-muted/50 font-semibold"
      />
    </div>
  );
};

export default TimeInput;
