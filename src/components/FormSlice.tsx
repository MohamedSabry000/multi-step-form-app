import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setForm } from '../redux/form-slice'

type IElement = {
  name: string,
  label: string,
  type: string,
  required: boolean,
  options?: any
}

const first = [
  {name: "first_name", label: "First Name", type: "text",required: true},
  {name: "last_name", label: "Last Name", type: "text",required: true},
  {name: "email", label: "Email", type: "email",required: true}
]
const second = [
  {name: "age", label: "Age", type: "number", required: false},
  {name: "gender", label: "Gender", type: "select", required: false, options: {
    male: "Male",
    female: "Female"
  }},
  {name: "phone_number", label: "Phone Number", type: "number", required: true},
]


function FormSlice() {
  const formData = useSelector((state: any) => state);
  const dispatch = useDispatch()
  const [data, setData] = React.useState( {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    age: formData.age,
    gender: formData.gender,
    phone_number: formData.phone_number,
  })
  const [err, setErr] = React.useState(false)
  const [tempData, setTempData] = React.useState({})
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

  const renderTextInputElement = (element: IElement, val:string) =>
    <input
    type={element.type}
    name={element.name}
    required={element.required}
    value={val}
    onChange={e => setData({...data, [element.name]: e.target.value})}
  />
  const renderSelectElement = (element: IElement, val:string) =>
    <select
      name={element.name}
      required={element.required}
      defaultValue={val}
      onChange={e => setData({...data, [element.name]: e.target.value})}
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
      const val  = entry ? entry[1] : ""
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