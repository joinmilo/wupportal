for config_file in $(find . -name "*codegen.yml"); do
  echo "Running graphql-codegen for $config_file"
  graphql-codegen --config $config_file
done