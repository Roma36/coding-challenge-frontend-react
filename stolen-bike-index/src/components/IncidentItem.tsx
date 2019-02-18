import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import config from '../config';

interface IncidentItemProps {
  link: string;
  imageUrl: string;
  title: string;
  description: string;
  theftDate: Date;
  reportDate: Date;
  location: string;
}

const ItemWrapper = styled.div`
  display: flex;
  height: 200px;
  padding: 30px 15px;
  border: 3px solid #000;
  margin-bottom: 30px;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  flex: 1;
`;

const Picture = styled.img`
  border: 1px solid #000;
  width: 150px;
  height: 150px;
  flex: 0 0 auto;
`;

const Description = styled.div`
  padding-top: 15px;
  margin-bottom: 15px;
  flex: 1;
`;

const AdditionalInfo = styled.div`
  margin-bottom: 30px;
`;

const UpdatedDate = styled.div`
  align-self: flex-end;
`;

function IncidentItem({ imageUrl, title, link, description, theftDate, reportDate, location }: IncidentItemProps) {
  return (
    <ItemWrapper>
      <Picture alt="bike picture" src={imageUrl || config.publicUrl + '/favicon.ico'} />
      <InfoWrapper>
        <Link to={link}>{title}</Link>
        <Description>
          <Truncate lines={3} ellipsis="...">
            {description}
          </Truncate>
        </Description>
        <AdditionalInfo>
          <span>
            {theftDate.toDateString()}
            {Boolean(location) && ` - ${location}`}
          </span>
        </AdditionalInfo>
        <UpdatedDate>
          <strong>Updated:</strong> {reportDate.toDateString()}
        </UpdatedDate>
      </InfoWrapper>
    </ItemWrapper>
  );
}

export default IncidentItem;
