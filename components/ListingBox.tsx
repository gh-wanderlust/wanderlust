import React from 'react';
import Link from 'next/link';
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis';
import styled from 'styled-components';

const ListingBox = (props: any) => {
  const { listing } = props;
  const pageUrl = `/listings/${listing.id}`;

  return (
    <Link href={pageUrl} key={listing.id}>
      <Wrapper>
        <div className="text">
          <Title>{listing.name}</Title>

          <TrimmedText
            text={listing.description}
            maxLine="3"
            ellipsis="..."
            basedOn="letters"
          />
          <Price>${listing.price / 100 || '$0'}/night</Price>
          <p>
            {props.trips.length
              ? props.trips.length + ' other traveler(s) interested!'
              : ''}
          </p>
        </div>

        <img src={listing.ownerPhotos[0]} alt="" />
      </Wrapper>
    </Link>
  );
};

export default ListingBox;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 4vw;
  padding: 4vh 2vw;
  align-items: center;
  border-bottom: 1px solid var(--dark-gray);
  min-height: min-content;
  cursor: pointer;

  img {
    object-fit: cover;
    width: 100%;
    height: 80%;
  }
`;

const TrimmedText = styled(LinesEllipsis)`
  padding: 0;
  color: darkgray;
`;

const Title = styled.h3`
  font-weight: 400;
  font-size: 20px;
  margin: 0;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-weight: 500;
`;
