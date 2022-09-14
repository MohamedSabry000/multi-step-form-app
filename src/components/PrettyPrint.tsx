import React from 'react'
import { useSelector } from 'react-redux';

function PrettyPrint() {
  const formData = useSelector((state: any) => state);
  return (
    <div id="print">
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  )
}

export default PrettyPrint