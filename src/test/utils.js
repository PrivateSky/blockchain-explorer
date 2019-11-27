export function getFormInputValue(wrapper, inputName) {
  let input = wrapper.find(`input[name="${inputName}"]`);
  if (!input.length) {
    input = wrapper.find(`textarea[name="${inputName}"]`);
  }

  return input.props().value;
}

export function setFormInputValue(wrapper, inputName, value) {
  let input = wrapper.find(`input[name="${inputName}"]`);
  if (!input.length) {
    input = wrapper.find(`textarea[name="${inputName}"]`);
  }

  input.simulate("change", { target: { name: inputName, value } });
}
