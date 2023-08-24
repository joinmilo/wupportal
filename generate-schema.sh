echo "[Start] generating"
for config_file in $(find . -name "*codegen.ts"); do
  echo "[Running] graphql-codegen for $config_file"
  graphql-codegen --config $config_file
done
echo "[Stop] generating"