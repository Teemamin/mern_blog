let er = {
    errors: {
      password: {
        name: "ValidatorError",
        message: "Path `password` (`23`) is shorter than the minimum allowed length (6).",
        properties: {
          message: "Path `password` (`23`) is shorter than the minimum allowed length (6).",
          type: "minlength",
          minlength: 6,
          path: "password",
          value: "23"
        },
        kind: "minlength",
        path: "password",
        value: "23"
      }
    },
    _message: "User validation failed",
    name: "ValidationError",
    message: "User validation failed: password: Path `password` (`23`) is shorter than the minimum allowed length (6)."
  }

  console.log(Object.values(er.errors).map(itm=>itm.message).join(','))