const validationDog = (dog) => {
  let errorsDog = {};

  //*Error Dog.
  if (!dog.name) {
    errorsDog.name = "This field is required.";
  } else if (/^[0-9]*$/.test(dog.name)) {
    errorsDog.name = "This field mustn't contain any numbers.";
  }
  if (!dog.lifeSpan) {
    errorsDog.lifeSpan = "This field is required.";
  } else if (/^[A-Za-z]*$/.test(dog.lifeSpan)) {
    errorsDog.lifeSpan = "This field must only contain numbers.";
  }
  if (dog.temper.length === 0) {
    errorsDog.temper = "This field is required.";
  }
  if (dog.image) {
    if (!dog.image.includes(".jpg") && !dog.image.includes(".png")) {
      errorsDog.image =
        "This field should be fill with a link ended in .jpg or .png";
    }
  }

  return errorsDog;
};

const validationWeight = (weight) => {
  let errorsWeight = {};

  //*Error Weight.
  if (!weight.weightMin) {
    errorsWeight.weightMin = "This field is required.";
  } else if (/^[A-Za-z]*$/.test(weight.weightMin)) {
    errorsWeight.weightMin = "This field must only contain numbers.";
  }
  if (!weight.weightMax) {
    errorsWeight.weightMax = "This field is required.";
  } else if (/^[A-Za-z]*$/.test(weight.weightMax)) {
    errorsWeight.weightMax = "This field must only contain numbers.";
  }

  return errorsWeight;
};

const validationHeight = (height) => {
  let errorsHeight = {};

  //*Error Height
  if (!height.heightMin) {
    errorsHeight.heightMin = "This field is required.";
  } else if (/^[A-Za-z]*$/.test(height.heightMin)) {
    errorsHeight.heightMin = "This field must only contain numbers.";
  }
  if (!height.heightMax) {
    errorsHeight.heightMax = "This field is required.";
  } else if (/^[A-Za-z]*$/.test(height.heightMax)) {
    errorsHeight.heightMax = "This field must only contain numbers.";
  }

  return errorsHeight;
};

export { validationDog, validationWeight, validationHeight };
