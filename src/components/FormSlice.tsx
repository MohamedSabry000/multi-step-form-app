import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setForm } from '../redux/form-slice'
import { first, second } from './data';

type IElement = {
  name: string,
  label: string,
  type: string,
  required: boolean,
  options?: any
}


function FormSlice() {
  const formData = useSelector((state: any) => state);
  const [data, setData]: [any, any]= React.useState( { ...formData } );
  const [err, setErr] = React.useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  React.useEffect(() => {
    document.title = `Step ${id}`
  }, [id])

  React.useEffect(() => {
    if(Number(id)===2 && data.phone_number.length > 0) {
      dispatch(setForm({...data, success: true}))
    } else {
      dispatch(setForm({success: false}))
    }
  }, [id, data, dispatch])

  const handleError = (elem: any) => {
    let error = false;
    elem.forEach((element: IElement) => {
      let entry = Object.entries(data).find(([key, value]) => key === element.name)
      const val  = entry ? entry[1] : ""
      if (element.required && val === "") {
        error = true;
        return
      }
    })
    return error
  }
  const next = () => {
    console.log(data)
    setErr(false);
    data && dispatch(setForm(data));

    (id === "1" && !handleError(first))?
      navigate(`/step/2`)
    : (id === "2" && !handleError(second)) ?
      navigate(`/print`)
    : setErr(true)
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({...data, [name]: value})
  }

  const renderTextInputElement = (element: IElement, val:string) =>
    <input
    type={element.type}
    name={element.name}
    required={element.required}
    value={val}
    onChange={handleInputChange}
  />
  const renderSelectElement = (element: IElement, val:string) =>
    <select
      name={element.name}
      required={element.required}
      defaultValue={val}
      onChange={handleInputChange}
    >
      <option value="">Select</option>
      {
        Object.entries(element.options).map(([key, value]: any) => {
          return <option key={key} value={key}>{value}</option>
        })
      }
    </select>

  const render = (elements: IElement[]) => {
    return elements.map((element: IElement, index) => {
      let entry =Object.entries(data).find(([key, value]) => key === element.name)
      const val: string  = `${entry ? entry[1] : ""}`
      return (
        <div className="form-control" key={index}>
          <label>{element.label}: <span className="required">{element.required ? "*" : ""}</span></label>
          { element.type === "select" ? renderSelectElement(element, val) : renderTextInputElement(element, val)}
        </div>
      )}
    )
  }

  return (
    <div id="slices">
      <div className="form">
        {
          {
            1: render(first),
            2: render(second),
          }[id || 1]
        }
        {
          err && <p className="error">Please fill out all required fields</p>
        }
        <div className="form-control" style={{display: "flex", justifyContent: "space-between", margin: "10px 0", paddingBottom: 0}}>
          <button disabled={Number(id) === 1} onClick={() => navigate('/step/1')}>
            Prev
          </button>
          <button onClick={next} disabled={Number(id) === 2 && !formData.success}>
            { Number(id) === 1? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormSlice