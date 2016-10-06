FILE(REMOVE_RECURSE
  "CMakeFiles/helloWorld.dir/helloWorld.cpp.o"
  "helloWorld.pdb"
  "helloWorld"
)

# Per-language clean rules from dependency scanning.
FOREACH(lang CXX)
  INCLUDE(CMakeFiles/helloWorld.dir/cmake_clean_${lang}.cmake OPTIONAL)
ENDFOREACH(lang)
