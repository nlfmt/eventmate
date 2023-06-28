import c from "@/components/forms/createEvent.module.scss";
import cs from "@/styles/common.module.scss";
import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import DotNavigation from "@/components/DotNavigation";
import CreateEventHeading from "@/components/forms/CreateEventHeading";
import EventDetails from "@/components/forms/EventDetails";
import Plans from "@/components/forms/Plans";
import Requirements from "@/components/forms/Requirements";
import Invited from "@/components/forms/Invited";
import Finished from "@/components/forms/Finished";

const Test: NextPage = () => {
  const [count, setCount] = useState(0);
  const [isEventDetailsFilled, setIsEventDetailsFilled] = useState(false);

  function handleEventDetailsSubmit() {
    setIsEventDetailsFilled(true);
    setCount((prevCount) => prevCount + 1);
  }

  function handleNextClick() {
    if (count === 0 && isEventDetailsFilled) {
      setCount((prevCount) => prevCount + 1);
    } else if (count > 0) {
      setCount((prevCount) => prevCount + 1);
    }
  }

  function handleBackClick() {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  }

  return (
    <>
      <Head>
        <title>Create Event</title>
      </Head>
      <main className={cs.main}>
        <div className={c.background}>
          <CreateEventHeading />
          <DotNavigation count={count} />
          {count === 0 && (
            <EventDetails/>
          )}
          {count === 1 && <Plans />}
          {count === 2 && <Requirements />}
          {count === 3 && <Invited />}
          {count === 4 && <Finished />}
          <div className={c.form}>
            {count === 0 && (
              <button
                className={cs.submitButton}
                onClick={handleNextClick}
                disabled={!isEventDetailsFilled}
              >
                Next
              </button>
            )}
            {count === 1 && (
              <button className={cs.submitButton} onClick={handleNextClick}>
                Next
              </button>
            )}
            {count === 2 && (
              <button className={cs.submitButton} onClick={handleNextClick}>
                Next
              </button>
            )}
            {count === 3 && (
              <button className={cs.submitButton} onClick={handleNextClick}>
                Create Event
              </button>
            )}
            {count >= 1 && count < 4 && (
              <h1 className={c.back} onClick={handleBackClick}>
                Back
              </h1>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Test;
