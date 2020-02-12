import React from "react";
import Link from "next/link";
// @ts-ignore
import LinesEllipsis from "react-lines-ellipsis";
import styled from "styled-components";

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
          <p>{listing.price || "$0"}/night</p>
          <p>X other people are interested</p>
        </div>

        <img src={listing.ownerPhotos[0]} alt="" />
      </Wrapper>
    </Link>
  );
};

export default ListingBox;

const Wrapper = styled.div`
  font-family: Helvetica;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 10px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 250px;
  cursor: pointer;
  max-height: 300px;
  max-width: 500px;
  overflow: hidden;

  .text {
    padding: 15px 30px;
  }

  img {
    height: 300px;
    display: block;
  }
`;

const TrimmedText = styled(LinesEllipsis)`
  padding: 0;
`;
