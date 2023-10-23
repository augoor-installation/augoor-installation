#!/bin/bash

for md in `ls -1 *.md`
do
  FILENAME=$(basename -- "$md")
  BASENAME=${FILENAME%%.*}
  pandoc -t docx $BASENAME.md --reference-doc=reference.docx -o $BASENAME.docx
done