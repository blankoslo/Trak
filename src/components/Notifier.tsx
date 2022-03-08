import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Button from '@mui/material/Button';
import Markdown from 'components/Markdown';
import { useState } from 'react';

type NotifierProps = {
  header: string;
  expandedMessage: string;
};

const Notifier = ({ header, expandedMessage }: NotifierProps) => {
  const [showExpandedMessage, setShowExpandedMessage] = useState(false);

  return (
    <div>
      <Button endIcon={showExpandedMessage ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} onClick={() => setShowExpandedMessage(!showExpandedMessage)}>
        <span aria-label='Utropstegn' role='img'>
          {' '}
          ❗️
        </span>{' '}
        {header}
      </Button>
      {showExpandedMessage && <Markdown text={expandedMessage} />}
    </div>
  );
};

export default Notifier;
