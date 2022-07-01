import {screen, fireEvent, render} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";
import {useStudents} from "./useStudent";
import {act} from "react-dom/test-utils";

test("success ", async () => {
  const {result, waitForNextUpdate} = renderHook(() => useStudents());
  expect(result.current).toHaveLength(0);
  await waitForNextUpdate();
  expect(result.current).toHaveLength(2);
});
