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
          <h3>{listing.name}</h3>

          <TrimmedText
            text={listing.description}
            maxLine="3"
            ellipsis="..."
            basedOn="letters"
          />
          <p>{listing.price || '$0'}/night</p>
          <p>X other people are interested</p>
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
  padding: 2vh 2vw;
  align-items: center;
  border-bottom: 1px solid var(--dark-gray);

  img {
    object-fit: cover;
    width: 100%;
    height: 80%;
  }
`;

const TrimmedText = styled(LinesEllipsis)`
  padding: 0;
`;
